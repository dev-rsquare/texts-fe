import * as React from 'react';
import * as classNames from 'classnames';

interface P {
    className?: string;
    create(id, text): Promise<boolean>;
    items: IText[];
    fetching: boolean;
}
interface S {
    match: boolean;
}

export class InputCell extends React.Component<P, S> {
    private id;
    private text;

    state = {match: false};

    constructor(props) {
        super(props);
        this.submit         = this.submit.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
    }

    render() {
        const {className, fetching} = this.props;
        const {match}               = this.state;
        return (
            <form className={classNames('-text -input row', className)} onSubmit={this.submit}>
                <input className="form-control -id col-md-2" ref={r => this.id = r} placeholder="STRING_ID" onChange={this.handleChangeId}/>
                <textarea className="form-control -text col-md-8" ref={r => this.text = r} placeholder="TEXT" onChange={this.handleChangeText}/>
                <button className="-button-bg col-md-2" type="submit" disabled={fetching}>
                    <span className="-button-text">{match ? 'update' : 'create'}</span>
                </button>
            </form>
        );
    }

    private setTextAreaRows() {
        this.text.style.height = `${this.text.value.split('\n').length * 30}px`;
    }

    submit(e) {
        e.preventDefault();
        this.text.style.height = `30px`;
        this.props.create(this.id.value, this.text.value);
    }

    handleChangeId() {
        this.setState({match: this.props.items.some(item => item.getId() === this.id.value)});
    }

    handleChangeText(e) {
        this.setTextAreaRows()
    }

    setData(id, text) {
        this.id.value   = id;
        this.text.value = text;
        this.handleChangeId();
        this.setTextAreaRows();
    }
}
